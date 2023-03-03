using Microsoft.AspNetCore.Identity;

namespace CRM.Services.JwtToken
{
    public interface ITokenService
    {
        string GenerateToken(IdentityUser identityUser);
    }
}
