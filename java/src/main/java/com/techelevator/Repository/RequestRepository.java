package com.techelevator.Repository;

import com.techelevator.model.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RequestRepository extends JpaRepository<Request, Integer> {

    @Query(value =
            "SELECT * FROM request r " +
            "JOIN participant_request pr ON r.request_id = pr.request_id " +
             "WHERE pr.participant_id = :participantId",
            nativeQuery = true
    )
    List<Request> findByInviteeId(int participantId);


    List<Request> findByCreatorId(long id);


    Request findByRequestId(int id);


    Request save(Request request);


    void delete(Request request);
}
