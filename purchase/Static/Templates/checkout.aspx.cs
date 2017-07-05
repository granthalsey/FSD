using System;
using System.Collections;
using System.Collections.Specialized;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Web.UI;
using e2RMclasses;
using e2RMclasses.Web;

namespace PurchaseTemplate.Static.Templates
{
	public partial class checkout : Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{
			bool isPreviewMode = Request.QueryString.ToString().EndsWith("ContentPreview");
			string languageCode;
			int locationIdNotUsed;
			var eventId = utilRegV2.getQueryStringValues(Request.QueryString, out locationIdNotUsed, out languageCode);
			var @event = userAccountHelper.getEvent(eventId, languageCode);

			var content = elementPropertyBinder.getContent(eventId, @event.TemplateID, "checkout.aspx", languageCode);
			var parentControls = new Hashtable();
			elementPropertyBinder.bindControlCollection(Page.Controls, content, isPreviewMode, Page, parentControls, false);
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