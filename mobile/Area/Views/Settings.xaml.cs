using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
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

			//todo check if I did works LOL

			/*Http Auth*/
			var authData = string.Format("{0}:{1}", Application.Current.Properties["Email"].ToString(), Application.Current.Properties["Password"].ToString());
			var authHeaderValue = Convert.ToBase64String(Encoding.UTF8.GetBytes(authData));

			/*create http client*/
			HttpClient _client = new HttpClient(); //NSUrlSessionHandler() by default for ios
			_client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", authHeaderValue);

			/*connect to api here !*/
			if (Device.RuntimePlatform == Device.iOS)
				_client.BaseAddress = new Uri("http://localhost:8080"); //set base url. ios's localhost: 127.0.0.1
			else if (Device.RuntimePlatform == Device.Android)
				_client.BaseAddress = new Uri("http://10.0.2.2:8080"); //set base url. android's localhost: 10.0.2.2
			else
				_client.BaseAddress = new Uri("http://107.0.0.1:8080"); //set base url windows

			var response =  await _client.DeleteAsync("/user/me"); // send get Request and take endpoint in param
			//string content = await response.Content.ReadAsStringAsync();
			if (response.StatusCode == System.Net.HttpStatusCode.OK)
			{
				await DisplayAlert("Account deleted", "Success", "OK");
				await Navigation.PushAsync(new LoginPage());
				Navigation.RemovePage(Navigation.NavigationStack[0]); // remove the root page
			}
			else
				await DisplayAlert("Account deleted", response.StatusCode.ToString(), "KO");
		}
	}
}
