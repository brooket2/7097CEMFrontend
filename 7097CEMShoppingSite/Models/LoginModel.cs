using _7097CEMShoppingSite.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace _7097CEMShoppingSite.Models
{
    public class LoginModel : PageModel
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public LoginModel(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [BindProperty]
        public RegisterViewModel Register { get; set; } = new RegisterViewModel();

        [BindProperty]
        public LoginViewModel Login { get; set; } = new LoginViewModel();

        public string LoginMessage { get; set; }

        public void OnGet()
        {
            ViewData["Title"] = "Login / Register";
        }       
    }
}
