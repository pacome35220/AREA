using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Area.Models
{
	public class Service
	{
		public class Area
		{
			public string action { get; set; }
			public string reaction { get; set; }
			public bool IsItGeneral { get; set; }

			public Area (string action, string reaction, bool IsItGeneral)
			{
				this.action = action;
				this.reaction = reaction;
				this.IsItGeneral = IsItGeneral;
			}
		}

		public string name { get; set; }
        //public List<string> actions { get; set; }
		public List<Area> area;
		//string tab[2]; // tab[0] --> action "If you push a new branch"
		// tab[1] --> reaction "create a pull request"
		//public List<string> reactions { get; set; }
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
				area = new List<Service.Area> {
					new Service.Area ("If you push a new branch ...", "A PR to master is create with this branch.", false),
					new Service.Area ("A text representing the action is send to", "generic reaction", true)
				}
			},
			new Service () {
				name = "Github",
				area = new List<Service.Area> {
					new Service.Area ("If you push a new branch ...", "A PR to master is create with this branch.", false),
					new Service.Area ("If you push a new branch ... generic", "A text representing the action is send to", true)
				}
			},
			new Service {
				name = "LinkedIn",
				area = new List<Service.Area> {
					new Service.Area ("If you push a new branch ...", "Create a pull request", false),
					new Service.Area ("general request", "LOL mdr", true)
				}
			},
			new Service {
				name = "Discord",
				area = new List<Service.Area> {
					new Service.Area ("If you are added to a channel", "A random message is send into it.", false),
					new Service.Area ("If you are added to a channel generic", "A text representing the action is send to", true)
				}
			},
			new Service {
				name = "Office365",
				area = new List<Service.Area> {
					new Service.Area ("If you push a new branch ...", "Create a pull request", false),
					new Service.Area ("general request", "LOL mdr", true)
				}
			},
			new Service {
				name = "Youtube",
				area = new List<Service.Area> {
					new Service.Area ("If you push a new branch ...", "Create a pull request", false),
					new Service.Area ("general request", "LOL mdr", true)
				}
			},
			new Service {
				name = "Imgur",
				area = new List<Service.Area> {
					new Service.Area ("If you push a new branch ...", "Create a pull request", false),
					new Service.Area ("general request", "LOL mdr", true)
				}
			},
			new Service {
				name = "Reddit",
				area = new List<Service.Area> {
					new Service.Area ("If you push a new branch ...", "Create a pull request", false),
					new Service.Area ("general request", "LOL mdr", true)
				}
			}
		};
        public async Task<List<Service>> GetItemsAsync(int pageIndex, int pageSize)
        {
            await Task.Delay(2000);

            return _data.Skip(pageIndex * pageSize).Take(pageSize).ToList();
        }
    }
}
