package com.unibuc.fmi.review_everything.repository;

import com.unibuc.fmi.review_everything.model.FriendRequest;
import com.unibuc.fmi.review_everything.enums.Status;
import com.unibuc.fmi.review_everything.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long> {
    List<FriendRequest> findByReceiverAndStatus(User receiver, Status status);
    List<FriendRequest> findBySenderAndStatus(User sender, Status status);
    List<FriendRequest> findBySenderAndReceiverAndStatus(User sender, User receiver, Status status);
}
