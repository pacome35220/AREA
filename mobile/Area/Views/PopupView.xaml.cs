using System;
using System.Collections.Generic;
using System.Linq;
using Area.Models;
using Rg.Plugins.Popup.Services;
using Xamarin.Forms;

namespace Area.Views
{
	public partial class PopupView
	{
		private class DisplayedData
		{
			public List<string> Services { get; set; }
			public List<string> Reactions { get; set; }
			public List<string> Actions { get; set; }
		}

		Service _currentService;

		public PopupView(Service service)
		{
			//init displayed data 
			DisplayedData displayedData = new DisplayedData();
			// no need to check the properties exist because if we are here it's means that UserAccount exist
			var userAccountsProperty = Application.Current.Properties["UserAccounts"] as UserAccounts;

			//store the current service
			_currentService = service;

			//store displayed data
			displayedData.Services = userAccountsProperty.UserServices.Select(x => x.Key).ToList(); //get all services that the user get auth
			displayedData.Reactions = service.reactions;
			displayedData.Actions = service.actions;

			//binding it to the xaml
			this.BindingContext = displayedData;
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
					if (pickerName == "Services")
						userAccountsProperty.UserServices[_currentService.name].serviceReaction = picker.SelectedItem.ToString(); // This is the model selected in the picker
					else if (pickerName == "Actions")
						userAccountsProperty.UserServices[_currentService.name].action = picker.SelectedItem.ToString(); // This is the model selected in the picker
					else
						userAccountsProperty.UserServices[_currentService.name].reaction = picker.SelectedItem.ToString(); // This is the model selected in the picker

					//save in properties
					Application.Current.Properties["UserAccounts"] = userAccountsProperty;
				}
			}
		}

		public void Register(object sender, EventArgs e)
		{
			//delete the current pop up
			PopupNavigation.Instance.PopAsync();
			//go to the reactions pop up
			//todo remove it, it was just for debugging
			var userAccountsProperty = Application.Current.Properties["UserAccounts"] as UserAccounts;
			DisplayAlert(userAccountsProperty.UserServices[_currentService.name].accessToken, userAccountsProperty.UserServices[_currentService.name].action, userAccountsProperty.UserServices[_currentService.name].reaction);
			DisplayAlert("Service reaction", userAccountsProperty.UserServices[_currentService.name].serviceReaction, "OK");
			//todo send data to API here
		}
	}
}
