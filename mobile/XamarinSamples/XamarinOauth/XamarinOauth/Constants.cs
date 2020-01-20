namespace OAuthNativeFlow
{
	public static class Constants
	{
		public static string AppName = "OAuthNativeFlow";

		// OAuth
		// For Google login, configure at https://console.developers.google.com/
		public static string iOSClientId = "267105976610-usc3rvj6o7189dug1uvsppivv49vs7gi.apps.googleusercontent.com";//"267105976610-221jpmnens3ub1u5nflcft1fm10r0tus.apps.googleusercontent.com";//"AIzaSyBl0qCugx2a5cDvgh4ld8zBuhBbCwFX8Io";//"<insert IOS client ID here>";
		public static string AndroidClientId = "<insert Android client ID here>";

		// These values do not need changing
		public static string Scope = "https://www.googleapis.com/auth/userinfo.email";
		public static string AuthorizeUrl = "https://accounts.google.com/o/oauth2/auth";
		public static string AccessTokenUrl = "https://www.googleapis.com/oauth2/v4/token";
		public static string UserInfoUrl = "https://www.googleapis.com/oauth2/v2/userinfo";

		// Set these to reversed iOS/Android client ids, with :/oauth2redirect appended
		public static string iOSRedirectUrl = "com.googleusercontent.apps.267105976610-usc3rvj6o7189dug1uvsppivv49vs7gi:/oauth2redirect";//"https://xamarinoauth-265216.firebaseapp.com/__/auth/handler";//"https://developers.google.com/oauthplayground";//";//"<insert IOS redirect URL here>:/oauth2redirect";
		public static string AndroidRedirectUrl = "<insert Android redirect URL here>:/oauth2redirect";
	}
}