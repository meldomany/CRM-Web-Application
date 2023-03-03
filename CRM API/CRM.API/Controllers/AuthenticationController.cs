using CRM.Models.DTOs.Authentication;
using CRM.Services.JwtToken;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CRM.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly ITokenService _tokenService;

        public AuthenticationController(
            UserManager<IdentityUser> userManager,
            ITokenService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            if (ModelState.IsValid)
            {
                var exisit_user = await _userManager.FindByEmailAsync(loginDto.Email);
                if (exisit_user == null)
                {
                    return BadRequest(new AuthResultDto
                    {
                        Result = false,
                        Errors = new List<string>
                        {
                            "Invalid email address"
                        }
                    });
                }

                var check_password = await _userManager.CheckPasswordAsync(exisit_user, loginDto.Password);
                if (!check_password)
                {
                    return BadRequest(new AuthResultDto
                    {
                        Result = false,
                        Errors = new List<string>
                        {
                            "Invalid password"
                        }
                    });
                }

                var token = _tokenService.GenerateToken(exisit_user);
                if(token != null)
                {
                    return Ok(new AuthResultDto
                    {
                        Result = true,
                        Token = token,
                        UserId = exisit_user.Id,
                        UserName = exisit_user.UserName,
                        Email = exisit_user.Email
                    });
                }
            }
            return BadRequest();
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            if (ModelState.IsValid)
            {
                var user_exist = await _userManager.FindByEmailAsync(registerDto.Email);
                if (user_exist != null)
                {
                    return BadRequest(new AuthResultDto
                    {
                        Result = false,
                        Errors = new List<string>
                        {
                            "Email is already exists"
                        }
                    });
                }
                var new_user = new IdentityUser
                {
                    Email = registerDto.Email,
                    UserName = registerDto.UserName
                };

                var is_created = await _userManager.CreateAsync(new_user, registerDto.Password);
                if (is_created.Succeeded)
                {
                    // create jwtToken
                    var token = _tokenService.GenerateToken(new_user);
                    if (token != null)
                    {
                        return Ok(new AuthResultDto
                        {
                            Result = true,
                            Token = token,
                            UserId = new_user.Id,
                            UserName = new_user.UserName,
                            Email = new_user.Email
                        });
                    }
                }
                else
                {
                    return BadRequest(new AuthResultDto
                    {
                        Result = false,
                        Errors = new List<string>
                        {
                            "Server error occured, please contact admin"
                        }
                    });
                }
            }
            return BadRequest();
        }
    }
}
