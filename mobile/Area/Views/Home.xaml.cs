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
		UserAccounts _user;

		public Home()
		{
			InitializeComponent();
			store = AccountStore.Create();
			_user = new UserAccounts();

		}

		public void LoginClicked(object sender, EventArgs e)
		{
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
			else if (providername == "Discord")
			{
				authenticator = new OAuth2Authenticator(
					clientId: Constants.DiscordClientId,
					clientSecret: Constants.DiscordClientSecret,
					scope: Constants.DiscordScope,
					authorizeUrl: new Uri(Constants.DiscordAuthorizeUrl),
					redirectUrl: new Uri(Constants.DiscordRedirectUrl),
					accessTokenUrl: new Uri(Constants.DiscordAccessUrl)
				);
			}
			else if (providername == "Trello")
			{
				authenticator = new OAuth2Authenticator(
					clientId: Constants.TrelloClientId,
					clientSecret: Constants.TrelloClientSecret,
					scope: Constants.TrelloScope,
					authorizeUrl: new Uri(Constants.TrelloAuthorizeUrl),
					redirectUrl: new Uri(Constants.TrelloRedirectUrl),
					accessTokenUrl: new Uri(Constants.TrelloAccessUrl)
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

			if (authenticator != null)
			{
				authenticator.Completed -= OnAuthCompleted;
				authenticator.Error -= OnAuthError;
			}
			if (e.IsAuthenticated)
			{
				//if (e.Account.Properties.ContainsKey("access_token"))
				//{
				_user.AccessToken = e.Account.Properties["access_token"];
				await DisplayAlert("AccessToken", _user.AccessToken, "OK");
			//	}
			//	else
				//	await DisplayAlert("AccessToken", "FAILED", "KO");
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
