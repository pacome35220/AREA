using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using Area.Models;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;



namespace Area.Views
{
	[XamlCompilation(XamlCompilationOptions.Compile)]
	public partial class LoginPage : ContentPage
	{
		public LoginPage()
		{
			InitializeComponent();
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

			_client = new HttpClient(); //check new NSUrlSessionHandler() for ios
			_client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", authHeaderValue);

			/*connect to api here !*/
			_client.BaseAddress = new Uri("http://10.0.2.2:8080"); //set base url
			var response = await _client.GetAsync("/user/me"); // send get Request take endpoint in param
			string content = await response.Content.ReadAsStringAsync();
			await DisplayAlert("Login", response.ToString(), "OK");
			await DisplayAlert("Content", content, "OK");
		}

		void Entry_Username_TextChanged(System.Object sender, Xamarin.Forms.TextChangedEventArgs e)
		{
		}
	}
}
