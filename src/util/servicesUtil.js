const getServicesString = services=>{
    return services.map((service)=>{
        return service.title
    }).join(', ')
  }

export default getServicesString