namespace OAuthNativeFlow
{
	public static class Constants
	{
		public static string AppName = "area";

		// OAuth
		// For Google login, configure at https://console.developers.google.com/
		public static string iOSClientId = "829850811692-gn1r71thf98b3maid37lafu24f3ji1ro.apps.googleusercontent.com";//"<insert IOS client ID here>";
		public static string AndroidClientId = "829850811692-gn1r71thf98b3maid37lafu24f3ji1ro.apps.googleusercontent.com";

		// These values do not need changing
		public static string Scope = "https://www.googleapis.com/auth/userinfo.email";
		public static string AuthorizeUrl = "https://accounts.google.com/o/oauth2/auth";
		public static string AccessTokenUrl = "https://www.googleapis.com/oauth2/v4/token";
		public static string UserInfoUrl = "https://www.googleapis.com/oauth2/v2/userinfo";

		// Set these to reversed iOS/Android client ids, with :/oauth2redirect appended
		public static string iOSRedirectUrl = "com.googleusercontent.apps.829850811692-gn1r71thf98b3maid37lafu24f3ji1ro:/oauth2redirect";
		public static string AndroidRedirectUrl = "com.googleusercontent.apps.829850811692-gn1r71thf98b3maid37lafu24f3ji1ro:/oauth2redirect";


		/*Facebook oauth*/
		public static string FacebookClientId = "189477332115486";

		public static string FacebookAuthorizeUrl = "https://m.facebook.com/dialog/oauth/";

		public static string FacebookScope = "";

		public static string FacebookRedirectUrl = "https://www.facebook.com/connect/login_success.html";

		/*Github oauth*/
		public static string GithubClientId = "490053360a981c0d36dd";

		public static string GithubClientSecret = "8c7bafed7afafc3a6817f9cccda115ed250ba083";

		public static string GithubScope = "";

		public static string GithubAuthorizeUrl = "https://github.com/login/oauth/authorize";

		public static string GithubRedirectUrl = "https://hadibereksi.fr/";

		public static string GithubAccessUrl = "https://github.com/login/oauth/access_token";

	}
}
