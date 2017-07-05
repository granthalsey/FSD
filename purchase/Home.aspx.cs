using System;
using System.Globalization;
using System.Web.UI;
using e2RMclasses;
using e2RMclasses.PersistentObjects;
using e2RMclasses.Web;

namespace PurchaseTemplate
{
	public partial class Home : Page
	{

		// BaseUrl will be pulled from the database in the final version of this project (when it's migrated into the core solution).
		// It's only hardcoded here because there will only be one domain accessed by this project.
		public const string BaseUrl = "https://securedev2012a.artezhq.com";
		public string WebGetServiceUrl = BaseUrl + "/webGetService/";
		public string ImageWriterUrl = BaseUrl + "/registrant/ImageWriter.aspx?ElementPropertyId=";
		public string WebSetServiceUrl;
		public string Language;
		public string EventId;

		protected void Page_Load(object sender, EventArgs e)
		{
			WebGetServiceUrl = ApplicationSettingsHelper.getApplicationValue("regV2_webGetServiceURL", true);
			WebSetServiceUrl = ApplicationSettingsHelper.getApplicationValue("regV2_webSetServiceURL", true);
			Language = LanguagePreference.ReadFrom(Request.QueryString);
			EventId = ParticipantSession.getEventIDFromQueryString(Request.QueryString).ToString(CultureInfo.InvariantCulture);
		}


		// temporary dummy code
		protected override void InitializeCulture()
		{
			var selectedLanguage = LanguagePreference.ReadFrom(Request.QueryString);
			UICulture = selectedLanguage;
			Culture = selectedLanguage;
			base.InitializeCulture();
		}
	}
}
