using Microsoft.AspNetCore.Mvc;
using TaskMicroservice.Models;

namespace TaskMicroservice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly TaskDbContext _context;

        public TaskController(TaskDbContext context)
        {
            _context = context;
        }

        // GET: api/task
        [HttpGet]
        public ActionResult<IEnumerable<Task>> GetTasks()
        {
            return Ok(_context.Tasks.ToList());
        }

        // POST: api/task
        [HttpPost]
    
public ActionResult<Task> CreateTask([FromBody] Task task)
{
    _context.Tasks.Add(task);
    _context.SaveChanges();

    return CreatedAtAction(nameof(GetTasks), new { id = task.Id }, task);
}

        // Additional methods for PUT and DELETE can be added here
    }
}
