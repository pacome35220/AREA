using System;
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
			SaveUserInfo(null, null, false);
		}

		void CreateAccount(object sender, EventArgs e)
		{
			Navigation.PushAsync(new CreateAccount());
		}

		private void SaveUserInfo(string email, string password, bool isLogged)
		{
			Application.Current.Properties["Email"] = email;
			Application.Current.Properties["Password"] = password;
			Application.Current.Properties["IsLogged"] = isLogged ? "true" : "false"; // save state of the app to "I am logged"
			Application.Current.SavePropertiesAsync(); //force save tmp
		}

		async private void Login(HttpClientRequests requests)
		{
			var response = await requests.SignIn();

			//check if account already created
			if (response == System.Net.HttpStatusCode.OK)
			{
				SaveUserInfo(requests._email, requests._password, true);
				await DisplayAlert("Login", "Success", "OK");
				await Navigation.PushAsync(new DashBoard());
				Navigation.RemovePage(Navigation.NavigationStack[0]); // remove the root page
			}
			else
			{
				await DisplayAlert("Login", "Failed", "Ko");
			}
		}

		async void OnLoginClicked(object sender, EventArgs e)
		{
			string email = Entry_Mail.Text;
			string password = Entry_Password.Text;
			HttpClientRequests requests = new HttpClientRequests(email, password);

			Login(requests);
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

		private class GoogleUserInfo {
			public string email { get; set; }
			public string verified_email { get; set; }
			public string name { get; set; }
			public string given_name { get; set; }
			public string family_name { get; set; }
			public string picture { get; set; }
		}

		async void CreateAccountGoogleAuth(GoogleUserInfo googleUser)
		{
			User user = new User(googleUser.given_name, googleUser.family_name, googleUser.email);
			HttpClientRequests requests = new HttpClientRequests(googleUser.email, "LOLILOL12"); //todo check how to deal with password

			//I try to login to check if the account is already sign up
			Login(requests);

			//if I'm not signed up I sign up
			var response = await requests.SignUp(user);

			if (response == System.Net.HttpStatusCode.OK)
			{
				// I login as soon as i have created the account on the server
				Login(requests);
			}
			else
			{
				await DisplayAlert("Sign up failed", response.ToString(), "KO");
			}
		}

		async void OnAuthCompleted(object sender, AuthenticatorCompletedEventArgs e)
		{
			var authenticator = sender as OAuth2Authenticator;
			GoogleUserInfo user = null;

			if (authenticator != null)
			{
				authenticator.Completed -= OnAuthCompleted;
				authenticator.Error -= OnAuthError;
			}
			if (e.IsAuthenticated)
			{
				// If the user is authenticated, request their basic user data from Google
				var request = new OAuth2Request("GET", new Uri(Constants.UserInfoUrl), null, e.Account);
				var response = await request.GetResponseAsync();
				if (response != null)
				{
					// Deserialize the data and store it in the account store
					// The users email address will be used to identify data in SimpleDB
					string userJson = await response.GetResponseTextAsync();
					//await DisplayAlert("JSON", userJson, "OK"); debug
					user = JsonConvert.DeserializeObject<GoogleUserInfo>(userJson);
				}

				if (account != null)
				{
					store.Delete(account, Constants.AppName);
				}

				CreateAccountGoogleAuth(user);

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
