namespace CRM.Models.DTOs.Authentication
{
    public class AuthResultDto
    {
        public bool Result { get; set; }
        public List<string> Errors { get; set; }
        public string Token { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
    }
}
