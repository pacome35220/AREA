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

		//todo use this method to save data
		public void OnPickerSelectedIndexChanged(object sender, EventArgs e)
		{
			Picker picker = sender as Picker;
			var selectedItem = picker.SelectedItem; // This is the model selected in the picker
			//DisplayAlert("OK", selectedItem.ToString(), "OK");
		}

		public void Register(object sender, EventArgs e)
		{
			//delete the current pop up
			PopupNavigation.Instance.PopAsync();
			//go to the reactions pop up
			if (_currentType == PopUp.Actions)
				PopupNavigation.Instance.PushAsync(new PopupView(_currentService, PopUp.Reactions));
		}
	}
}
