namespace _7097CEMShoppingSite.Models
{
    public class Review
    {
        public int Id { get; set; }
        public string ItemName { get; set; }
        public int Rating { get; set; }
        public string Body { get; set; }
        public string Username { get; set; }
        public DateTime PostedAt { get; set; }
    }
}