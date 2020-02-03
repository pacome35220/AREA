using System;

using Xamarin.Forms;

namespace Area.Models
{
	public class User
	{
        public string id { get; set; }
        public string password { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string email { get; set; }
        public string picture { get; set; }
        public string link { get; set; }


        public User(string firstName, string lastName, string email)
        {
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
        }

        public bool checkInfo()
        {
            return !(email.Equals("") || password.Equals(""));
        }
    }
}
