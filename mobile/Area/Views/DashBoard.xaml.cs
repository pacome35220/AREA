using System;
using System.Collections.Generic;
using BottomBar.XamarinForms;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace Area.Views
{
	public partial class DashBoard : BottomBarPage
	{
		public DashBoard()
		{
			InitializeComponent();
			if (Application.Current.Properties.ContainsKey("tab_state"))
			{
				CurrentPage = Children[int.Parse(Application.Current.Properties["tab_state"].ToString())];
			}
		}
		protected override void OnCurrentPageChanged()
		{
			Device.BeginInvokeOnMainThread(async () =>
			{
				Application.Current.Properties["tab_state"] = Children.IndexOf(CurrentPage);

				await Application.Current.SavePropertiesAsync();
			});

			base.OnCurrentPageChanged();
		}
	}
}
