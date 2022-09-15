package com.techelevator.Repository;

import com.techelevator.model.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant, Integer> {

    List<Participant> findAll();

    Participant findByParticipantId(int participantId);

    Participant findByUsername(String username);

    int findIdByUsername(String username);

    Participant save(Participant participant);


}
