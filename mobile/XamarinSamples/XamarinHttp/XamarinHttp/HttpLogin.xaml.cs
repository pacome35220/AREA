using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using Xamarin.Forms;

namespace Constants
{
    public partial class HttpLogin : ContentPage
    {
        string Username = "Hadi bereksi";
        string Password = "Azerty12";

        public HttpLogin()
        {
            InitializeComponent();
        }
        public HttpClient _client;
        void OnLoginClicked(object sender, EventArgs e)
        {
            var authData = string.Format("{0}:{1}", Username, Password);
            var authHeaderValue = Convert.ToBase64String(Encoding.UTF8.GetBytes(authData));

            _client = new HttpClient();
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", authHeaderValue);
            /*connect to api here !*/
            _client.GetAsync("<urlapi>");
        }
    }
}
