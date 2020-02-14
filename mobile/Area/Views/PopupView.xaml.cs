using System;
using System.Collections.Generic;
using Area.Models;
using Rg.Plugins.Popup.Services;
using Xamarin.Forms;

namespace Area.Views
{
	public enum PopUp {Actions,  Reactions};
	public partial class PopupView
	{
		private class DisplayedData
		{
			public List<string> Area { get; set; }
			public string Title { get; set; }
		}

		private PopUp _currentType;
		private Service _currentService;

		public PopupView(Service service, PopUp typePopUp)
		{
			//init displayed data 
			DisplayedData displayedData = new DisplayedData();

			displayedData.Area = typePopUp == PopUp.Actions ? service.actions : service.reactions;
			displayedData.Title = typePopUp == PopUp.Actions ? "Select an actions" : "Select a reactions";

			//Save current pop up state
			_currentType = typePopUp;
			_currentService = service;

			//binding it to the xaml
			this.BindingContext = displayedData;
			InitializeComponent();
		}

		public void OnPickerSelectedIndexChanged(object sender, EventArgs e)
		{
			//Check if the property exist todo else the user is NOT auth
			if (Application.Current.Properties.ContainsKey("UserAccounts"))
			{
				Picker picker = sender as Picker;
				//we get UserAccounts from the properties and we store it in a variable
				var userAccountsProperty = Application.Current.Properties["UserAccounts"] as UserAccounts;


				//check key exist If yes, store the element inside the properties
				if (userAccountsProperty.UserServices.ContainsKey(_currentService.name))
				{
					//we check the current popupType if we are on the action's popUp
					//we store the 'picker' selected item inside action variable
					//else inside the reaction variable
					if (_currentType == PopUp.Actions)
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
			if (_currentType == PopUp.Actions)
				PopupNavigation.Instance.PushAsync(new PopupView(_currentService, PopUp.Reactions));
			else
			{
				//todo remove it, it was just for debugging
				var userAccountsProperty = Application.Current.Properties["UserAccounts"] as UserAccounts;
				DisplayAlert(userAccountsProperty.UserServices[_currentService.name].accessToken, userAccountsProperty.UserServices[_currentService.name].action, userAccountsProperty.UserServices[_currentService.name].reaction);
			}
		}
	}
}
