using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Area.Models;
using Rg.Plugins.Popup.Services;
using Xamarin.Forms;

namespace Area.Views
{
	public partial class PopupView
	{
		Service _currentService;
		private class DisplayedData
		{
			//public event PropertyChangedEventHandler PropertyChanged;
			public List<string> Services { get; set; }
			public bool IsItGeneral { get; set;}
			public List<string> Reactions { get; set; }
			public List<string> Actions { get; set; }
		}
		DisplayedData _displayedData;

		private List<string> areasToActionsList(List<Service.Area> areas)
		{
			List<string> actionList = new List<string>();

			foreach (Service.Area area in areas)
			{
				actionList.Add(area.action);	
			}
			return actionList;
		}

		private List<string> areasToReactionsList(List<Service.Area> areas)
		{
			List<string> reactionList = new List<string>();

			foreach (Service.Area area in areas)
			{
				reactionList.Add(area.reaction);
			}
			return reactionList;
		}

		private Service.Area getAreaByAction(List<Service.Area> areas, string action)
		{
			foreach (Service.Area area in areas)
			{
				if (area.action == action)
					return area;
			}
			return new Service.Area(null, null, false);
		}

		private Service.Area getAreaByReaction(List<Service.Area> areas, string reaction)
		{
			foreach (Service.Area area in areas)
			{
				if (area.reaction == reaction)
					return area;
			}
			return new Service.Area(null, null, false);
		}


		public PopupView(Service service)
		{
			//init displayed data 
			_displayedData = new DisplayedData();
			// no need to check the properties exist because if we are here it's means that UserAccount exist
			var userAccountsProperty = Application.Current.Properties["UserAccounts"] as UserAccounts;

			//store the current service
			_currentService = service;

			//store displayed data
			_displayedData.Services = userAccountsProperty.UserServices.Select(x => x.Key).ToList(); //get all services that the user get auth
			_displayedData.Reactions = areasToReactionsList(service.area); // get reactions
			_displayedData.Actions = areasToActionsList(service.area); //get actions
			_displayedData.IsItGeneral = true;
			//binding it to the xaml
			BindingContext = _displayedData;
			InitializeComponent();
		}

		public void OnPickerSelectedIndexChanged(object sender, EventArgs e)
		{
			//Check if the property exist
			if (Application.Current.Properties.ContainsKey("UserAccounts"))
			{
				Picker picker = sender as Picker;
				string pickerName = picker.ClassId;
				//we get UserAccounts from the properties and we store it in a variable
				var userAccountsProperty = Application.Current.Properties["UserAccounts"] as UserAccounts;


				//check key exist If yes, store the element inside the properties
				if (userAccountsProperty.UserServices.ContainsKey(_currentService.name))
				{
					//we check the current pickername
					//we store data inside properties
					if (pickerName == "Actions")
					{
						Service.Area area = getAreaByAction(_currentService.area, picker.SelectedItem.ToString());
						userAccountsProperty.UserServices[_currentService.name].action = area.action;// This is the model selected in the picker
						//re init area values
						userAccountsProperty.UserServices[_currentService.name].serviceReaction = null;
						userAccountsProperty.UserServices[_currentService.name].reactionAccessToken = null;
						userAccountsProperty.UserServices[_currentService.name].reaction = null;
						_displayedData.IsItGeneral = area.IsItGeneral;
					}
					else if (pickerName == "Services")
					{
						if (!_displayedData.IsItGeneral && picker.SelectedItem.ToString() != _currentService.name)
						{
							DisplayAlert("Warning", "You can't choose a service because you choosed a specific action !", "OK");
						}
						else
						{
							userAccountsProperty.UserServices[_currentService.name].serviceReaction = picker.SelectedItem.ToString(); // reaction auth by service name on api
							userAccountsProperty.UserServices[_currentService.name].reactionAccessToken = userAccountsProperty.UserServices[picker.SelectedItem.ToString()].accessToken;
						}
					}
					else
					{
						Service.Area area = getAreaByReaction(_currentService.area, picker.SelectedItem.ToString());

						if (area.IsItGeneral == _displayedData.IsItGeneral)
							userAccountsProperty.UserServices[_currentService.name].reaction = area.reaction; // This is the model selected in the picker
						else
						{
							DisplayAlert("Warning", "You can't choose a generic reaction because you choosed a specific action !", "OK");
						}
					}
					//save in properties
					Application.Current.Properties["UserAccounts"] = userAccountsProperty;
				}
			}
		}

		private bool checkServiceArea()
		{
			var userAccountsProperty = Application.Current.Properties["UserAccounts"] as UserAccounts;

			if (userAccountsProperty.UserServices[_currentService.name].action == null ||
			userAccountsProperty.UserServices[_currentService.name].serviceReaction == null ||
			userAccountsProperty.UserServices[_currentService.name].reactionAccessToken == null ||
			userAccountsProperty.UserServices[_currentService.name].reaction == null)
				return false;
			return true;
		}

		async public void Register(object sender, EventArgs e)
		{
			//check  whether all data have been saved or not
			if (checkServiceArea())
			{
				//delete the current pop up
				//go to the reactions pop up
				var userAccountsProperty = Application.Current.Properties["UserAccounts"] as UserAccounts;

				//send data to API here
				HttpClientRequests requests = new HttpClientRequests(Application.Current.Properties["Email"].ToString(), Application.Current.Properties["Password"].ToString());
				System.Net.HttpStatusCode response;
				if (_displayedData.IsItGeneral)
				{
					string actionServiceName = _currentService.name;
					int actionId = 0;
					string actionAccessToken = userAccountsProperty.UserServices[_currentService.name].accessToken;
					string reactionServiceName = userAccountsProperty.UserServices[_currentService.name].serviceReaction;
					string reactionAccessToken = userAccountsProperty.UserServices[_currentService.name].reactionAccessToken;
					HttpClientRequests.GenericArea packet = new HttpClientRequests.GenericArea(actionServiceName, actionId, actionAccessToken, reactionServiceName, reactionAccessToken);

					response = await requests.RegisterGenericArea(packet);
				}
				else
				{
					string serviceName = userAccountsProperty.UserServices[_currentService.name].serviceReaction;
					int areaId = 0;
					string actionAccessToken = userAccountsProperty.UserServices[_currentService.name].reactionAccessToken;

					HttpClientRequests.SpecificArea packet = new HttpClientRequests.SpecificArea(serviceName, areaId, actionAccessToken);

					response = await requests.RegisterSpecificArea(packet);
				}
				if (response == System.Net.HttpStatusCode.OK)
				{
					await DisplayAlert("AREA", "Saved", "OK");
					await PopupNavigation.Instance.PopAsync();
				}
				else
				{
					await DisplayAlert("CODE", response.ToString(), "OK");
					await DisplayAlert("FAILED", "Area not Saved", "OK");
				}
			}
			else
			{
				await DisplayAlert("Warning", "Data can't be saved, pick your area !", "OK");
			}
		}

		void Picker_PropertyChanged(System.Object sender, System.ComponentModel.PropertyChangedEventArgs e)
		{
		}
	}
}
