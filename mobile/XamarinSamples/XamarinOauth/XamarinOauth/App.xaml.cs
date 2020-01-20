using System;
using OAuthNativeFlow;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace XamarinOauth
{
    public partial class App : Application
    {
        public App()
        {
            InitializeComponent();

            MainPage = new OAuthNativeFlowPage();
        }

        protected override void OnStart()
        {
        }

        protected override void OnSleep()
        {
        }

        protected override void OnResume()
        {
        }
    }
}
