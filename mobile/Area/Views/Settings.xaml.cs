using System;
using Area.Models;
using Xamarin.Forms;

namespace Area.Views
{
	public partial class Settings : ContentPage
	{
		public Settings()
		{
			InitializeComponent();
		}
		public void LogOut(object sender, EventArgs e)
		{
			DisplayAlert("Logout", "Success", "OK");
			Navigation.PushAsync(new LoginPage());
			Navigation.RemovePage(Navigation.NavigationStack[0]); // remove the root page
		}
		async public void DeleteAccount(object sender, EventArgs e)
		{
			string email = Application.Current.Properties["Email"].ToString(); //todo check if diff null
			string password = Application.Current.Properties["Password"].ToString();
			HttpClientRequests requests = new HttpClientRequests(email, password);
			var response = await requests.DeleteUser();

			if (response == System.Net.HttpStatusCode.OK)
			{
				if (Application.Current.Properties.ContainsKey("UserAccounts"))
					Application.Current.Properties["UserAccounts"] = new UserAccounts();
				await DisplayAlert("Account deleted", "Success", "OK");
				await Navigation.PushAsync(new LoginPage());
				Navigation.RemovePage(Navigation.NavigationStack[0]); // remove the root page
			}
			else
				await DisplayAlert("Account deleted", response.ToString(), "KO");
		}
	}
}
