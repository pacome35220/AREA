using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Java.Util.Jar.Attributes;

namespace Area.Models
{
	public class Service
	{
        public string name { get; set; }
        public List<string> actions { get; set; }
		public List<string> reactions { get; set; }
	}

	public class Services //todo change name obj 
	{
		public Services()
		{
		}

		private readonly List<Service> _data = new List<Service>
		{
			new Service () {
				name = "Facebook",
				actions = new List<string> {"If you push a new branch ...", "If I receive a mail...", "If I Fuck your wife...", "If I kill myself..."},
				reactions = new List<string> {"pop up a notice", "create a branch"}
			},
			new Service () {
				name = "Github",
				actions = new List<string> {"If you push a new branch ...", "If I receive a mail..."},
				reactions = new List<string> {"pop up a notice", "create a branch"}
			},
			new Service {
				name = "LinkedIn",
				actions = new List<string> {"If you push a new branch ...", "If I receive a mail..."},
				reactions = new List<string> {"pop up a notice", "create a branch"}
			},
			new Service {
				name = "Discord",
				actions = new List<string> {"If you push a new branch ...", "If I receive a mail..."},
				reactions = new List<string> {"pop up a notice", "create a branch"}
			},
			new Service {
				name = "Office365",
				actions = new List<string> {"If you push a new branch ...", "If I receive a mail..."},
				reactions = new List<string> {"pop up a notice", "create a branch"}
			},
			new Service {
				name = "Youtube",
				actions = new List<string> {"If you push a new branch ...", "If I receive a mail..."},
				reactions = new List<string> {"pop up a notice", "create a branch"}
			},
			new Service {
				name = "Imgur",
				actions = new List<string> {"If you push a new branch ...", "If I receive a mail..."},
				reactions = new List<string> {"pop up a notice", "create a branch"}
			},
			new Service {
				name = "Trello",
				actions = new List<string> {"If you push a new branch ...", "If I receive a mail..."},
				reactions = new List<string> {"pop up a notice", "create a branch"}
			}
		};
        public async Task<List<Service>> GetItemsAsync(int pageIndex, int pageSize)
        {
            await Task.Delay(2000);

            return _data.Skip(pageIndex * pageSize).Take(pageSize).ToList();
        }
    }
}
