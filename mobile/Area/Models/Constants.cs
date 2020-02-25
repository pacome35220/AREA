using Xamarin.Forms;

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
		public static string Scope = "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";
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

		/*Discord oauth*/
		public static string DiscordClientId = "674906116009885707";

		public static string DiscordClientSecret = "r_U3g_4bsgW3v228lZhQGTAGECMhGrkW";

		public static string DiscordScope = "identify email connections";

		public static string DiscordAuthorizeUrl = "https://discordapp.com/api/oauth2/authorize";

		public static string DiscordRedirectUrl = Device.RuntimePlatform == Device.iOS ? "http://localhost:8080/api/discord/callback" : "http://10.0.2.2:8080/api/discord/callback"; //ios/android

		public static string DiscordAccessUrl = "https://discordapp.com/api/oauth2/token";

		/*Office365*/
		public static string Office365ClientId = "48f27166-a396-4d27-b416-d101d844d5f2";

		public static string Office365Scope = "User.Read profile openid email mail.read";

		public static string Office365AuthorizeUrl = "https://login.microsoftonline.com/901cb4ca-b862-4029-9306-e5cd0f6d9f86/oauth2/v2.0/authorize";//"https://login.microsoftonline.com/901cb4ca-b862-4029-9306-e5cd0f6d9f86/oauth2/v2.0/authorize";

		public static string Office365RedirectUrl = "msauth.com.companyname.Area://auth";//"http://localhost:8080/";////"https://hadibereksi.fr/";//"https://login.microsoftonline.com/common/oauth2/nativeclient";

		public static string Office365AccessUrl = "https://login.microsoftonline.com/901cb4ca-b862-4029-9306-e5cd0f6d9f86/oauth2/v2.0/token";//"https://login.microsoftonline.com/901cb4ca-b862-4029-9306-e5cd0f6d9f86/oauth2/v2.0/token";

		/*Imgur*/
		public static string ImgurClientId = "6b5472c176e8f40";

		public static string ImgurScope = "";

		public static string ImgurAuthorizeUrl = "https://api.imgur.com/oauth2/authorize";

		public static string ImgurRedirectUrl = "http://localhost:4200/home";//"http://localhost:8080/";

		public static string ImgurAccessUrl = "https://api.imgur.com/oauth2/token";


		/* todo Youtube*/

		/*LinkedIn*/
		public static string LinkedinClientId = "86v21lx86n52vp";

		public static string LinkedinClientSecret = "Sz6abc1pM5gq65x0";

		public static string LinkedinScope = "r_emailaddress r_liteprofile w_member_social";

		public static string LinkedinAuthorizeUrl = "https://www.linkedin.com/uas/oauth2/authorization";

		public static string LinkedinRedirectUrl = "http://localhost:4200/home";

		public static string LinkedinAccessUrl = "https://www.linkedin.com/uas/oauth2/accessToken";

		/*Reddit*/
		public static string RedditClientId = "DXTM2r0EHO3Wig";

		public static string RedditClientSecret = "";

		public static string RedditScope = "identity edit flair history modconfig modflair modlog modposts modwiki mysubreddits privatemessages read report save submit subscribe vote wikiedit wikiread";

		public static string RedditAuthorizeUrl = "https://www.reddit.com/api/v1/authorize.compact";

		public static string RedditRedirectUrl = "http://localhost:8080/oauth2/callback";

		public static string RedditAccessUrl = "https://www.reddit.com/api/v1/access_token";


	}
}
