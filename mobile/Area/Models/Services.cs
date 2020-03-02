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
		public List<Area> area;
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
					new Service.Area ("Inshallah", "specific reaction fb", false),
					new Service.Area ("Inshallah ++", "generic reaction fb", true)
				}
			},
			new Service () {
				name = "Github",
				area = new List<Service.Area> {
					new Service.Area ("If you push a new branch ...", "A PR to master is created with this branch.", false),
					new Service.Area ("If you push a new branch ... generic", "A text representing the action is send to", true)
				}
			},
			new Service {
				name = "LinkedIn",
				area = new List<Service.Area> {
					new Service.Area ("If you have more than 10 connexions", "A post is made", false),
					new Service.Area ("If you have more than 10 connexions generic", "A message is send", true)
				}
			},
			new Service {
				name = "Discord",
				area = new List<Service.Area> {
					new Service.Area ("If a specific message is send", "A random message is send", false),
					new Service.Area ("If you are added to a channel generic", "A text representing the action is send to", true)
				}
			},
			new Service {
				name = "Office365",
				area = new List<Service.Area> {
					new Service.Area ("If i have too many mails", "Send me a mail", false),
					new Service.Area ("If i have too many mails generic", "send me a mail with a text", true)
				}
			},
			new Service {
				name = "Youtube",
				area = new List<Service.Area> {
					new Service.Area ("If your videos has more than 1k likes", "A random message is send", false),
					new Service.Area ("If your videos has more than 1k likes generic", "send text on youtube", true)
				}
			},
			new Service {
				name = "Imgur",
				area = new List<Service.Area> {
					new Service.Area ("if you wrote 10 comments", "Push an image", false),
					new Service.Area ("if you wrote 10 comments generic", "Send a message on imgur", true)
				}
			},
			new Service {
				name = "Reddit",
				area = new List<Service.Area> {
					new Service.Area ("If i have too many unread messages", "Create a live", false),
					new Service.Area ("If i have too many unread messages generic", "create a live with a specific text", true)
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
