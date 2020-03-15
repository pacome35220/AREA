using System;
using Area.Views;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace Area
{
    public partial class App : Application
    {
        public App()
        {
			InitializeComponent();
            //MainPage = new NavigationPage(new LoginPage());
        }

		protected override void OnStart()
        {
            // Handle when your app starts
            MainPage = checkLogin();
            SetValue(NavigationPage.HasNavigationBarProperty, false);
        }

        protected override void OnSleep()
        {
            // Handle when your app sleeps
        }

        protected override void OnResume()
        {
            // Handle when your app resumes
            MainPage = checkLogin();
        }

        NavigationPage checkLogin() {
			if (Application.Current.Properties.ContainsKey("IsLogged")) { //check key exist
				var IsLogged = Current.Properties["IsLogged"];
                // do something with IsLogged
                Console.WriteLine(IsLogged.ToString());
				return IsLogged.ToString() == "true" ? new NavigationPage(new DashBoard()) : new NavigationPage(new LoginPage());
			} else
                return new NavigationPage(new LoginPage());
        }
    }
}
