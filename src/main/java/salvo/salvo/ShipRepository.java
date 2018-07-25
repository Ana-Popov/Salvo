package salvo.salvo;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

//manages the creation and retrieval of ships in database

@RepositoryRestResource
public interface ShipRepository extends JpaRepository <Ship, Long> {

}
