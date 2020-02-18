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

		async void SignUp(object sender, EventArgs e)
		{
			string firstName = Entry_FirstName.Text;
			string lastName = Entry_lastName.Text;
			string password = Entry_Password.Text;
			string email = Entry_Email.Text;
			HttpClientRequests requests = new HttpClientRequests(email, password);
			User user = new User(firstName, lastName, email);
			var response = await requests.SignUp(user);
			 
			//if sign up success redirect to login page
			if (response == System.Net.HttpStatusCode.OK)
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
