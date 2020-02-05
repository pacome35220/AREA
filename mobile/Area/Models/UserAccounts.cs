using System;
namespace Area.Models
{
	public class UserAccounts
	{
		public UserAccounts()
		{
		}

        public string Name
        {
            get;
            set;
        }
        public string ScreenName
        {
            get;
            set;
        }

		public string AccessToken
		{
            get;
            set;
		}

        public string TokenSecret
        {
            get;
            set;
        }
        public bool IsAuthenticated
        {
            get
            {
                return !string.IsNullOrWhiteSpace(AccessToken);
            }
        }
    }
}
