using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using Area.Models;
using Newtonsoft.Json;
using Xamarin.Forms;

namespace Area.Views
{
	public partial class CreateAccount : ContentPage
	{
		public CreateAccount()
		{
			InitializeComponent();
		}
		public HttpClient _client;

		async void SignUp(object sender, EventArgs e)
		{
			string firstName = Entry_FirstName.Text;
			string familyName = Entry_FamilyName.Text;
			string password = Entry_Password.Text;
			string email = Entry_Email.Text;

			User user = new User(firstName, familyName, email);
			/*Http Auth*/
			var authData = string.Format("{0}:{1}", email, password);
			var authHeaderValue = Convert.ToBase64String(Encoding.UTF8.GetBytes(authData));

			_client = new HttpClient(); ///NSUrlSessionHandler() by default for ios
			_client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", authHeaderValue);

			var stringContent = new StringContent(JsonConvert.SerializeObject(user), Encoding.UTF8, "application/json");

			/*connect to api here !*/
			await DisplayAlert("Test", JsonConvert.SerializeObject(user), "OK");

			if (Device.RuntimePlatform == Device.iOS)
				_client.BaseAddress = new Uri("http://localhost:8080"); //set base url. ios's localhost: 127.0.0.1
			else if (Device.RuntimePlatform == Device.Android)
				_client.BaseAddress = new Uri("http://10.0.2.2:8080"); //set base url. android's localhost: 10.0.2.2
			else
				_client.BaseAddress = new Uri("http://107.0.0.1:8080"); //set base url windows 's localhost 127.0.0.1 not sure

			var response = await _client.PostAsync("/user/signup", stringContent);
			string content = await response.Content.ReadAsStringAsync();
			await DisplayAlert("Content", content, "OK");
			//redirect to login page if 201 have been sent
			if (response.StatusCode == System.Net.HttpStatusCode.OK) //todo 201 code success instead of 200 check with pacpac
			{
				await DisplayAlert("Sign up", "Account created !", "OK");
				await Navigation.PopAsync(); //remove the current screen
			}
			else
			{
				await DisplayAlert("Sign up failed", response.ToString(), "KO");
			}
		}
	}
}
