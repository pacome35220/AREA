using System;
using System.Collections.Generic;
using System.Linq;
using Area.Models;
using Newtonsoft.Json;
using OAuthNativeFlow;
using Xamarin.Auth;
using Xamarin.Forms;

namespace Area.Views
{
	public partial class Home : ContentPage
	{
		Account account;
		AccountStore store;

		public Home()
		{
			InitializeComponent();
			store = AccountStore.Create();

		}

		public void LoginClicked(object sender, EventArgs e)
		{
			string clientId = null;//Constants.FacebookClientId;
			string clientSecret = null;
			string scope = null;
			string redirectUri = null;//Constants.FacebookRedirectUrl;
			string authorizeUrl = null;
			string accessTokenUrl = null;
			OAuth2Authenticator authenticator;
			account = store.FindAccountsForService(Constants.AppName).FirstOrDefault();



			Button btncontrol = (Button)sender;
			string providername = btncontrol.Text;

			if (providername == "Facebook") {
				authenticator = new OAuth2Authenticator(
					clientId:	Constants.FacebookClientId,
					scope:		Constants.FacebookScope,
					authorizeUrl: new Uri(Constants.FacebookAuthorizeUrl),
					redirectUrl: new Uri(Constants.FacebookRedirectUrl)
				);
			}
			else if (providername == "Github")
			{
				authenticator = new OAuth2Authenticator(
					clientId: Constants.GithubClientId,
					clientSecret: Constants.GithubClientSecret,
					scope: Constants.GithubScope,
					authorizeUrl: new Uri(Constants.GithubAuthorizeUrl),
					redirectUrl: new Uri(Constants.GithubRedirectUrl),
					accessTokenUrl: new Uri(Constants.GithubAccessUrl)
				);
			}
			//TMP
			else
			{
				authenticator = new OAuth2Authenticator(
					clientId: Constants.FacebookClientId,
					scope: Constants.FacebookScope,
					authorizeUrl: new Uri(Constants.FacebookAuthorizeUrl),
					redirectUrl: new Uri(Constants.FacebookRedirectUrl)
				);
			}


			authenticator.Completed += OnAuthCompleted;
			authenticator.Error += OnAuthError;

			AuthenticationState.Authenticator = authenticator;

			var presenter = new Xamarin.Auth.Presenters.OAuthLoginPresenter();
			presenter.Login(authenticator);
		}

		async void OnAuthCompleted(object sender, AuthenticatorCompletedEventArgs e)
		{
			var authenticator = sender as OAuth2Authenticator;
			UserAccounts user = null;

			if (authenticator != null)
			{
				authenticator.Completed -= OnAuthCompleted;
				authenticator.Error -= OnAuthError;
			}
			if (e.IsAuthenticated)
			{
				var accessToken = e.Account.Properties["access_token"];
				// If the user is authenticated, request their basic user data from Google
				//UserInfoUrl = https://www.googleapis.com/oauth2/v2/userinfo
				//var request = new OAuth2Request("GET", new Uri(Constants.UserInfoUrl), null, e.Account);
				//var response = await request.GetResponseAsync();
				//if (response != null)
				//{
				//	// Deserialize the data and store it in the account store
				//	// The users email address will be used to identify data in SimpleDB
				//	string userJson = await response.GetResponseTextAsync();
				//	user = JsonConvert.DeserializeObject<UserAccounts>(userJson);
				//}

				//if (account != null)
				//{
				//	store.Delete(account, Constants.AppName);
				//}

				//await store.SaveAsync(account = e.Account, Constants.AppName);
				await DisplayAlert("AccessToken", accessToken, "OK");
				//await DisplayAlert("Family name address", user.lastName, "OK");
				//await DisplayAlert("Name address", user.firstName, "OK");
				//await DisplayAlert("Picture address", user.picture, "OK");
				//await DisplayAlert("Link address", user.link, "OK");
				//await DisplayAlert("Id address", user.id, "OK");
				//todo signup/signin

			}
		}

		void OnAuthError(object sender, AuthenticatorErrorEventArgs e)
		{
			var authenticator = sender as OAuth2Authenticator;

			if (authenticator != null)
			{
				authenticator.Completed -= OnAuthCompleted;
				authenticator.Error -= OnAuthError;
			}
		}



	}
}
