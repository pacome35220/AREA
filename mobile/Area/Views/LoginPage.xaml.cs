using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using Area.Models;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using OAuthNativeFlow;
using Xamarin.Auth;
using System.Linq;
using Newtonsoft.Json;

namespace Area.Views
{
	[XamlCompilation(XamlCompilationOptions.Compile)]
	public partial class LoginPage : ContentPage
	{
		Account account;
		AccountStore store;

		public LoginPage()
		{
			InitializeComponent();
			store = AccountStore.Create();
		}

		void CreateAccount(object sender, EventArgs e)
		{
			Navigation.PushAsync(new CreateAccount());
		}

		public HttpClient _client;

		async void OnLoginClicked(object sender, EventArgs e)
		{
			string email = Entry_Mail.Text;
			string password = Entry_Password.Text;

			/*Http Auth*/
			var authData = string.Format("{0}:{1}", email, password);
			var authHeaderValue = Convert.ToBase64String(Encoding.UTF8.GetBytes(authData));

			_client = new HttpClient(); //NSUrlSessionHandler() by default for ios
			_client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", authHeaderValue);

			/*connect to api here !*/
			if (Device.RuntimePlatform == Device.iOS)
				_client.BaseAddress = new Uri("http://localhost:8080"); //set base url. ios's localhost: 127.0.0.1
			else if (Device.RuntimePlatform == Device.Android)
				_client.BaseAddress = new Uri("http://10.0.2.2:8080"); //set base url. android's localhost: 10.0.2.2
			else
				_client.BaseAddress = new Uri("http://107.0.0.1:8080"); //set base url windows

			var response = await _client.GetAsync("/user/me"); // send get Request and take endpoint in param
			string content = await response.Content.ReadAsStringAsync();
			if (response.StatusCode == System.Net.HttpStatusCode.OK)
			{
				await DisplayAlert("Login", "Success", "OK");
				await Navigation.PopAsync(); //remove the current screen
				await Navigation.PushAsync(new DashBoard());
			}
			else
			{
				await DisplayAlert("Content", content, "OK");
			}
		}

		void GoogleAuth(object sender, EventArgs e)
		{
			string clientId = null;
			string redirectUri = null;

			switch (Device.RuntimePlatform)
			{
				case Device.iOS:
					clientId = Constants.iOSClientId;
					redirectUri = Constants.iOSRedirectUrl;
					break;

				case Device.Android:
					clientId = Constants.AndroidClientId;
					redirectUri = Constants.AndroidRedirectUrl;
					break;
			}
			account = store.FindAccountsForService(Constants.AppName).FirstOrDefault();
			var authenticator = new OAuth2Authenticator(
				clientId,
				null,
				Constants.Scope,
				new Uri(Constants.AuthorizeUrl),
				new Uri(redirectUri),
				new Uri(Constants.AccessTokenUrl),
				null,
				true);

			authenticator.Completed += OnAuthCompleted;
			authenticator.Error += OnAuthError;

			AuthenticationState.Authenticator = authenticator;

			var presenter = new Xamarin.Auth.Presenters.OAuthLoginPresenter();
			presenter.Login(authenticator);
		}

		async void OnAuthCompleted(object sender, AuthenticatorCompletedEventArgs e)
		{
			var authenticator = sender as OAuth2Authenticator;
			User user = null;

			if (authenticator != null)
			{
				authenticator.Completed -= OnAuthCompleted;
				authenticator.Error -= OnAuthError;
			}
			if (e.IsAuthenticated)
			{
				// If the user is authenticated, request their basic user data from Google
				// UserInfoUrl = https://www.googleapis.com/oauth2/v2/userinfo
				var request = new OAuth2Request("GET", new Uri(Constants.UserInfoUrl), null, e.Account);
				var response = await request.GetResponseAsync();
				if (response != null)
				{
					// Deserialize the data and store it in the account store
					// The users email address will be used to identify data in SimpleDB
					string userJson = await response.GetResponseTextAsync();
					user = JsonConvert.DeserializeObject<User>(userJson);
				}

				if (account != null)
				{
					store.Delete(account, Constants.AppName);
				}

				//await store.SaveAsync(account = e.Account, Constants.AppName);
				await DisplayAlert("Email address", user.email, "OK");
				await DisplayAlert("Family name address", user.lastName, "OK");
				await DisplayAlert("Name address", user.firstName, "OK");
				await DisplayAlert("Picture address", user.picture, "OK");
				await DisplayAlert("Link address", user.link, "OK");
				await DisplayAlert("Id address", user.id, "OK");
				//todo signup/signin

			}
		}

		void OnAuthError(object sender, AuthenticatorErrorEventArgs e)
		{
			var authenticator = sender as OAuth2Authenticator;

			if (authenticator != null) {
				authenticator.Completed -= OnAuthCompleted;
				authenticator.Error -= OnAuthError;
			}
		}
	}
}
