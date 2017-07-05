using System.Text;
using System.Web;
using System.Web.Optimization;
using BundleTransformer.Core.Transformers;

namespace MvcApplication1
{
    public class PartialsTransform : IBundleTransform
    {
        private readonly string _moduleName;
        private readonly string _physicalPath;
        public PartialsTransform(string moduleName)
        {
            _moduleName = moduleName;
        }

        public void Process(BundleContext context, BundleResponse response)
        {
            var strBundleResponse = new StringBuilder();
            // Javascript module for Angular that uses templateCache 
            strBundleResponse.AppendFormat(
                @"angular.module('{0}').run(['$templateCache',function(t){{",
                _moduleName);

            foreach (var file in response.Files)
            {
                // Get content of file
                var content = file.ApplyTransforms();
                // Remove newlines and replace ' with \\'
                content = content.Replace("'", "\\'").Replace("\r\n", "");
                // Find templateUrl by getting file path and removing inital ~
                var templateUrl = file.IncludedVirtualPath.Replace("~", "").Replace('\\', '/');
                // Add content of template file inside an Angular put method
                strBundleResponse.AppendFormat("t.put('{0}','{1}');", templateUrl, content);
            }
            strBundleResponse.Append(@"}]);");

            // response.Files = new FileInfo[] { };
            response.Content = strBundleResponse.ToString();
            response.ContentType = "text/javascript";
        }
    }

    public class PartialsBundle : Bundle
    {
        public PartialsBundle(string moduleName, string virtualPath)
            : base(virtualPath, new[] { new PartialsTransform(moduleName) })
        {
        }
    }

    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Clear();
            bundles.ResetAll();

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap.js").Include(
                        "~/Scripts/bootstrap/bootstrap.js"));

            bundles.Add(new ScriptBundle("~/bundles/ckeditor.js").Include(
                        "~/Scripts/ckeditor/ckeditor.js"));

            bundles.Add(new ScriptBundle("~/bundles/common.js").IncludeDirectory("~/static/js/common/", "*.js", true));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                "~/Scripts/Angular/angular.js").IncludeDirectory("~/Scripts/Angular", "angular-*", true));

            bundles.Add(new ScriptBundle("~/bundles/plugins.js").IncludeDirectory("~/Scripts/plugins", "*.js", true));
            bundles.Add(
                new ScriptBundle("~/bundles/datetimepicker.js").IncludeDirectory("~/Scripts/angular-bootstrap-datetimepicker", "*.js", true)
                    .IncludeDirectory("~/Scripts/angular-bootstrap-datetimepicker", "*.templates.js", true));

            bundles.Add(new ScriptBundle("~/bundles/edit.js").IncludeDirectory("~/Static/JS/edit", "*.module.js", true)
                .IncludeDirectory("~/Static/JS/edit", "*.config.js", true).IncludeDirectory("~/Static/JS/edit", "*.js", true));

            bundles.Add(new ScriptBundle("~/bundles/public.js").IncludeDirectory("~/Static/JS/public", "*.module.js", true)
               .IncludeDirectory("~/Static/JS/public", "*.config.js", true).IncludeDirectory("~/Static/JS/public", "*.js", true));

            var styles = new Bundle("~/bundles/admin.css");
            styles.IncludeDirectory("~/Static/CSS/app", "*.scss", false);
            styles.Transforms.Add(new StyleTransformer());
            bundles.Add(styles);

            styles = new Bundle("~/bundles/css/bootstrap");
            styles.Transforms.Add(new StyleTransformer());
            styles.Include("~/Static/CSS/bootstrap/bootstrap.scss");
            styles.Include("~/Static/CSS/bootstrap/ui-bootstrap-custom-2.5.0-csp.scss");
            bundles.Add(styles);

        }
    }
}