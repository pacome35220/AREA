using System;
using System.Collections.Generic;
using System.Linq;
using Area.Models;
using Newtonsoft.Json;
using OAuthNativeFlow;
using Rg.Plugins.Popup.Services;
using Xamarin.Auth;
using Xamarin.Forms;

namespace Area.Views
{
	//todo Create a properties (object) that will store all Useraccountds with (service name + access token + actions + reactions)
	public partial class Home : ContentPage
	{
		Account account;
		AccountStore store;
		UserAccounts _user;
		private string currentServiceName;

		public Home()
		{
			InitializeComponent();
			store = AccountStore.Create();
			_user = new UserAccounts();

		}

		private void ShowPopup(object sender, EventArgs e)
		{
			Button btn = (Button)sender;
			Service service = (Service)btn.BindingContext;

			if (_user.IsAuthenticated(service.name))
				PopupNavigation.Instance.PushAsync(new PopupView(service));
			else
				DisplayAlert("ALERT", "You need to authenticate before using this service !", "OK");
		}

		public void LoginClicked(object sender, EventArgs e)
		{
			OAuth2Authenticator authenticator;
			account = store.FindAccountsForService(Constants.AppName).FirstOrDefault();



			Button btncontrol = (Button)sender;
			string providername = btncontrol.ClassId;

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
			else if (providername == "Office365")
			{
				authenticator = new OAuth2Authenticator(
					clientId: Constants.Office365ClientId,
					scope: Constants.Office365Scope,
					authorizeUrl: new Uri(Constants.Office365AuthorizeUrl),
					redirectUrl: new Uri(Constants.Office365RedirectUrl)
					//accessTokenUrl: new Uri(Constants.Office365AccessUrl)
				);
			}
			else if (providername == "Imgur")
			{
				authenticator = new OAuth2Authenticator(
					clientId: Constants.ImgurClientId,
					clientSecret: "",
					scope: Constants.ImgurScope,
					authorizeUrl: new Uri(Constants.ImgurAuthorizeUrl),
					redirectUrl: new Uri(Constants.ImgurRedirectUrl),
					accessTokenUrl: new Uri(Constants.ImgurAccessUrl)
				);
			}
			else if (providername == "LinkedIn")
			{
				authenticator = new OAuth2Authenticator(
					clientId: Constants.LinkedinClientId,
					clientSecret: Constants.LinkedinClientSecret,
					scope: Constants.LinkedinScope,
					authorizeUrl: new Uri(Constants.LinkedinAuthorizeUrl),
					redirectUrl: new Uri(Constants.LinkedinRedirectUrl),
					accessTokenUrl: new Uri(Constants.LinkedinAccessUrl)
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

			currentServiceName = providername;
			authenticator.Completed += OnAuthCompleted;
			authenticator.Error += OnAuthError;

			AuthenticationState.Authenticator = authenticator;

			var presenter = new Xamarin.Auth.Presenters.OAuthLoginPresenter();
			presenter.Login(authenticator);
		}

		void OnAuthCompleted(object sender, AuthenticatorCompletedEventArgs e)
		{
			OAuth2Authenticator authenticator = sender as OAuth2Authenticator;

			if (authenticator != null)
			{
				authenticator.Completed -= OnAuthCompleted;
				authenticator.Error -= OnAuthError;
			}
			//if i authenticate successfuly I store the access token and i save it in properties
			if (e.IsAuthenticated)
			{
				//check if the service does not exist in the 'UserAccount' property
				//we create a new one
				if (!_user.UserServices.ContainsKey(currentServiceName))
					_user.UserServices[currentServiceName] = new UserAccounts.Data();

				//save access token of a service
				_user.UserServices[currentServiceName].accessToken = e.Account.Properties["access_token"];
				//save service in property
				Application.Current.Properties["UserAccounts"] = _user;
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
