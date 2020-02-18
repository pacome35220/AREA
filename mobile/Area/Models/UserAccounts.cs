using System.Collections.Generic;
using Xamarin.Forms;

namespace Area.Models
{
	public class UserAccounts
	{
		public UserAccounts()
		{
			UserServices = new Dictionary<string, Data> ();
		}

		public class Data
		{
			public Data()
			{
				accessToken = null;
				action = null;
				reaction = null;
				serviceReaction = null;
			}

			public string accessToken { get; set; }
			public string action { get; set; }
			public string reaction { get; set;}
			public string serviceReaction { get; set; }

			public bool IsThereAnAccessToken()
			{
				return accessToken == null ? false : true;
			}

		}

		//a map that will contain <ServiceName, data> data is a class that store (the accessToken + action + reaction)
		public Dictionary<string, Data> UserServices {get; set;}

        public string TokenSecret{get; set;} //??

		//check if the user is authenticated to the service given in parameter
		public bool IsAuthenticated(string serviceName)
		{
			//if the service exist return whether you are auth or not
			if (UserServices.ContainsKey(serviceName))
				return UserServices[serviceName].IsThereAnAccessToken();
			else
				return false;
		}

		//public void SaveInProperties()
		//{
		//	Application.Current.Properties["UserAccounts"] = this;
		//}
    }
}
