using System;
using System.Collections.Generic;

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
		public void DeleteAccount(object sender, EventArgs e)
		{
			//todo http request to the api in order to delete account

			DisplayAlert("Account deleted", "Success", "OK");
			Navigation.PushAsync(new LoginPage());
			Navigation.RemovePage(Navigation.NavigationStack[0]); // remove the root page
		}
	}
}
