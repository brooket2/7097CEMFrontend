using _7097CEMShoppingSite.Models;
using _7097CEMShoppingSite.Services;
using _7097CEMShoppingSite.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Net.Http;
using System.Text.Json;
using System.Text;

namespace _7097CEMShoppingSite.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ProductService _productService;
        private readonly IHttpClientFactory _httpClientFactory;

        public HomeController(ILogger<HomeController> logger, ProductService productService,IHttpClientFactory httpClientFactory)
        {
            _logger = logger;
            _productService = productService;
            _httpClientFactory = httpClientFactory;
        }

        public IActionResult Index()
        {
            return View();
        }
        public IActionResult AboutUs()
        {
            return View();
        }
        public IActionResult ContactUs()
        {
            return View();
        }
        public IActionResult Privacy()
        {
            return View();
        }
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
        public IActionResult Login()
        {
            var model = new AuthViewModel
            {
                Login = new LoginViewModel(),
                Register = new RegisterViewModel()
            };

            return View(model);
        }
        public async Task<IActionResult> Products()
        {
            var products = await _productService.GetProductsFromApi();

            var model = new ProductsModel
            {
                Products = products
            };

            return View(model);
        }
        public IActionResult Reviews()
        {
            return View();
        }
    }
}
