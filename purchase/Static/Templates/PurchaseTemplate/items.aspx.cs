using System;
using System.Collections.Specialized;
using System.Linq;
using e2RMclasses.Web;

namespace PurchaseTemplate.Static.Templates.PurchaseTemplate
{
	public partial class items : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{

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