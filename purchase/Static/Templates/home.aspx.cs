using System;
using System.Collections;
using System.Collections.Specialized;
using System.ComponentModel;
using System.Globalization;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading;
using e2RMclasses;

namespace PurchaseTemplate.Static.Templates
{
	public partial class home : System.Web.UI.Page
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

			heading.Text = Regex.Replace(heading.Text, "%eventName%", @event.EventName, RegexOptions.IgnoreCase);
			description.Text = Regex.Replace(description.Text, "%organizationName%", @event.OrgName);
		}

		protected override void InitializeCulture()
		{
			var selectedLanguage = LanguageFromQueryString(Request.QueryString);

			UICulture = selectedLanguage;
			Culture = selectedLanguage;

			Thread.CurrentThread.CurrentCulture = CultureInfo.CreateSpecificCulture(selectedLanguage);
			Thread.CurrentThread.CurrentUICulture = new CultureInfo(selectedLanguage);

			base.InitializeCulture();
		}

		private string LanguageFromQueryString(NameValueCollection queryStringParameters)
		{
			string[] parameterNames = {"LangPref", "Lang", "lp", "LanguageCode"};

			const string englishLanguageCode = "en-CA";
			const string frenchLanguageCode = "fr-CA";

			var languageParameter = parameterNames.FirstOrDefault(p => !string.IsNullOrEmpty(queryStringParameters[p]));

			if (languageParameter != null)
			{
				var cultureName = queryStringParameters[languageParameter];

				if (string.Equals(frenchLanguageCode, cultureName, StringComparison.OrdinalIgnoreCase))
				{
					return frenchLanguageCode;
				}
			}

			return englishLanguageCode;
		}
	}
}
