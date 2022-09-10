package com.techelevator.Repository;

import com.techelevator.model.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RequestRepository extends JpaRepository<Request, Integer> {

    @Query(value =
            "SELECT * FROM request r " +
            "JOIN request_user ru ON r.request_id = ru.request_id " +
             "WHERE ru.user_id = :id",
            nativeQuery = true
    )
    List<Request> findByInviteeId(long id);


    List<Request> findByCreatorId(long id);


    Request findByRequestId(int id);


    Request save(Request request);


    void delete(Request request);
}
