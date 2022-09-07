package com.techelevator.Repository;

import com.techelevator.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {


        List<User> findAll();

        @Query(
                value = "SELECT * FROM users WHERE user_id = :userId",
                nativeQuery = true
        )
        User findByUserId(Long userId);

        User findByUsername(String username);

        int findIdByUsername(String username);

}
