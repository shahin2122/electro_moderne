using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Core.Specifications;


namespace Core.Interfaces
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task<T> GetByIdAsync(int id);
        Task<IReadOnlyList<T>> ListAllAsync();
        Task<T> GetEntityWithSpecAsync(ISpecification<T> spec);
        Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec);
        Task<int> CountAsync(ISpecification<T> spec);
        Task AddAsync(T t);
        Task<bool> SaveAllAsync();
        void Add(T entity);
        void Update(T entity);
        void Delete(T entity);
       
    }
}