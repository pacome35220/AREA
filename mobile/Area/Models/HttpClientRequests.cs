using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using Xamarin.Forms;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace Area.Models
{
	public class HttpClientRequests
	{
		private HttpClient _client;

		//request header
		public string _email { get; set; }
		public string _password { get; set; }

		public class SpecificArea
		{
			public SpecificArea(string serviceName, int areaId, string actionAccessToken)
			{
				this.serviceName = serviceName;
				this.areaId = areaId;
				this.actionAccessToken = actionAccessToken;
			}
			public string serviceName;
			public int areaId;
			public string actionAccessToken;
		}

		public class GenericArea
		{
			public GenericArea(string actionServiceName, int actionId, string actionAccessToken, string reactionServiceName, string reactionAccessToken)
			{
				this.actionServiceName = actionServiceName;
				this.actionId = actionId;
				this.actionAccessToken = actionAccessToken;
				this.reactionServiceName = reactionServiceName;
				this.reactionAccessToken = reactionAccessToken;
			}

			public string actionServiceName;
			public int actionId;
			public string actionAccessToken;
			public string reactionServiceName;
			public string reactionAccessToken;
		}

		public HttpClientRequests(string email, string password)
		{
			_email = email;
			_password = password;
			var authData = string.Format("{0}:{1}", email, password);
			var authHeaderValue = Convert.ToBase64String(Encoding.UTF8.GetBytes(authData));

			_client = new HttpClient(); //NSUrlSessionHandler() by default for ios
			_client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", authHeaderValue);

			System.Diagnostics.Debug.WriteLine(authHeaderValue);
			/*connect to api here !*/
			if (Device.RuntimePlatform == Device.iOS)
				_client.BaseAddress = new Uri("http://localhost:8080"); //set base url. ios's localhost: http://localhost:8080
			else if (Device.RuntimePlatform == Device.Android)
				_client.BaseAddress = new Uri("http://10.0.2.2:8080"); //PROD: https://area.marc0.fr/api //set base url. android's localhost: http://10.0.2.2:8080
			else
				_client.BaseAddress = new Uri("http://107.0.0.1:8080"); //set base url windows
		}

		async public Task<System.Net.HttpStatusCode> SignIn() //Task is a promise 
		{
			var response = await _client.GetAsync("/user/me"); // send get Request and take endpoint in param

			System.Diagnostics.Debug.WriteLine(response);
			return response.StatusCode;
		}

		async public Task<System.Net.HttpStatusCode> SignUp(User user)
		{
			var stringContent = new StringContent(JsonConvert.SerializeObject(user), Encoding.UTF8, "application/json");
			var response = await _client.PostAsync("/user/signup", stringContent);

			System.Diagnostics.Debug.WriteLine(response);
			return response.StatusCode;
		}

		async public Task<System.Net.HttpStatusCode> DeleteUser()
		{
			var response = await _client.DeleteAsync("/user/me"); // send get Request and take endpoint in param

			System.Diagnostics.Debug.WriteLine(response);
			return response.StatusCode;
		}

		async public Task<System.Net.HttpStatusCode> ModifyUser(User user)
		{
			var stringContent = new StringContent(JsonConvert.SerializeObject(user), Encoding.UTF8, "application/json");
			var response = await _client.PutAsync("/user/signup", stringContent);

			System.Diagnostics.Debug.WriteLine(response);
			return response.StatusCode;
		}

		async public Task<System.Net.HttpStatusCode> RegisterSpecificArea(SpecificArea packet)
		{
			var stringContent = new StringContent(JsonConvert.SerializeObject(packet), Encoding.UTF8, "application/json");
			var response = await _client.PostAsync("/specific-area", stringContent);

			System.Diagnostics.Debug.WriteLine(response); // this line write on console
			return response.StatusCode;
		}

		async public Task<System.Net.HttpStatusCode> RegisterGenericArea(GenericArea packet)
		{
			var stringContent = new StringContent(JsonConvert.SerializeObject(packet), Encoding.UTF8, "application/json");
			var response = await _client.PostAsync("/generic-area", stringContent);

			System.Diagnostics.Debug.WriteLine(response);
			return response.StatusCode;
		}

	}
}
