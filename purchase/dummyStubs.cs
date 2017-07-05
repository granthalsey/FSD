using System;
using System.Collections;
using System.Collections.Specialized;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using System.Web.UI;
using e2RMclasses.PersistentObjects;

namespace e2RMclasses
{
	public class userAccountHelper
	{
		public static Event getEvent(int eventID, string languageCode = null)
		{
			if (String.IsNullOrEmpty(languageCode))
			{
				languageCode = "en-CA";
			}

			if (languageCode == "fr-CA")
			{
				return new Event(eventID, languageCode)
				{
					EventName = "dummy French Event name",
					OrgName = "dummy French organization name"
				};
			}
			return new Event(eventID, languageCode)
			{
				EventName = "dummy Event name",
				OrgName = "dummy organization name"
			};
		}
	}

	public class elementPropertyBinder
	{
		public static Hashtable getContent(int eventID, int templateID, string sScriptName, string languagePreference)
		{
			return null;
		}

		public static void bindControlCollection(ControlCollection oControlCollection, Hashtable hashControls,
			bool isPreviewMode,
			Page oPage, Hashtable parentControls, bool isColonPresent)
		{
		}
	}

	public class ApplicationSettingsHelper
	{
		/// <summary>
		/// Returns the value for a setting from the applicationSettings Table.
		/// </summary>
		public static string getApplicationValue(string key, bool emptyDefault)
		{
			switch (key)
			{
				case "regV2_webGetServiceURL":
					return "https://securedev2012a.artezhq.com/webGetService/Get.asmx/";
				case "webSetServiceURL":
					return "tbd"; // ../webSetService/RegisterParticipant.asmx/
			}

			return "?";
		}
	}
}
namespace e2RMclasses.Web
{
	/// <summary>
	///     Provides methods for determining the visitor's preferred language from a 
	///     NameValueCollection (typically Request.QueryString).
	/// </summary>
	/// <remarks>
	///     This class duplicates some of the work done by the  
	///     <see cref="e2RMClasses.ParticipantSession">ParticipantSession</see> class. 
	/// </remarks>
	public class LanguagePreference
	{
		/// <summary>
		///     The parameter names (keys) that will be checked for language preference.
		/// </summary>
		public static readonly string[] ParameterNames = { "LangPref", "Lang", "lp", "LanguageCode" };

		public const string EnglishLanguageCode = "en-CA";
		public const string FrenchLanguageCode = "fr-CA";

		/// <summary>
		///     Attempts to read a language (culture) identifier from the given name-value collection.
		/// </summary>
		/// <returns>
		///     The culture name, if found. Otherwise, the DefaultCultureName is returned.
		/// </returns>
		public static string ReadFrom(NameValueCollection queryStringParameters, string defaultLanguageCode = EnglishLanguageCode)
		{
			string cultureName = string.Empty;

			string matchingParameter = ParameterNames.FirstOrDefault(p => !string.IsNullOrEmpty(queryStringParameters[p]));

			if (!string.IsNullOrEmpty(matchingParameter))
			{
				cultureName = queryStringParameters[matchingParameter];

				if (string.Equals(EnglishLanguageCode, cultureName, System.StringComparison.OrdinalIgnoreCase))
				{
					return EnglishLanguageCode;
				}

				if (string.Equals(FrenchLanguageCode, cultureName, System.StringComparison.OrdinalIgnoreCase))
				{
					return FrenchLanguageCode;
				}
			}

			return defaultLanguageCode;
		}

		/// <summary>
		///     Inspects the given NameValueCollection and returns true if it contains a language
		///     preference (culture) key with a value in the expected <see cref="CultureFormat" />.
		///     Otherwise, returns false.
		/// </summary>
		public static bool IsProvidedBy(NameValueCollection queryStringParameters)
		{
			string matchingParameter =
				ParameterNames.FirstOrDefault(p => !string.IsNullOrEmpty(queryStringParameters[p]));

			return matchingParameter != null;
		}
	}
}
namespace e2RMclasses.PersistentObjects
{
	[Serializable]
	public class Event
	{
		public int EventID { get; private set; }
		public string LanguageCode { get; private set; }
		public string OrgName;
		public string EventName;
		public int TemplateID;

		public Event(int eventID, string languageCode)
		{
			EventID = eventID;
			LanguageCode = languageCode;
		}
	}

	public class ParticipantSession
	{
		public static int getEventIDFromQueryString(NameValueCollection queryString)
		{
			return 23961;
		}
	}
}
public class utilRegV2
{
	public static int getQueryStringValues(System.Collections.Specialized.NameValueCollection queryString,
		out int locationID,
		out string languageCode)
	{
		var stringEventID = queryString["eventID"] ?? "12345";
		int eventId = int.Parse(stringEventID);
		languageCode = queryString["lp"];
		locationID = eventId;
		return eventId;
	}
}