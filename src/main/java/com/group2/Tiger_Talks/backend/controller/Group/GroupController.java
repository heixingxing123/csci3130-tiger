package com.group2.Tiger_Talks.backend.controller.Group;

import com.group2.Tiger_Talks.backend.model.Group.GroupDTO;
import com.group2.Tiger_Talks.backend.model.Group.GroupMembershipDTO;
import com.group2.Tiger_Talks.backend.service.Group.GroupService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/groups")
public class GroupController {

    private final GroupService groupService;

    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    /**
     * Creates a new group.
     *
     * @param groupName the name of the group
     * @param creatorEmail the email of the group creator
     * @param isPrivate whether the group is private
     * @param interest the interest of the group
     * @return ResponseEntity with a success or error message
     */
    @PostMapping("/create/{groupName}/{creatorEmail}/{isPrivate}/{interest}")
    public ResponseEntity<String> createGroup(@PathVariable String groupName,
                                              @PathVariable String creatorEmail,
                                              @PathVariable boolean isPrivate,
                                              @PathVariable String interest) {
        Optional<String> result = groupService.createGroup(groupName, creatorEmail, isPrivate, interest);
        return result.map(ResponseEntity.badRequest()::body)
                .orElseGet(() -> ResponseEntity.ok("Group successfully created"));
    }

    /**
     * Adds a user to a group.
     *
     * @param email the email of the user
     * @param groupId the ID of the group
     * @return ResponseEntity with a success or error message
     */
    @PostMapping("/join/{email}/{groupId}")
    public ResponseEntity<String> joinGroup(@PathVariable String email, @PathVariable int groupId) {
        Optional<String> result = groupService.joinGroupUser(email, groupId);
        return result.map(ResponseEntity.badRequest()::body)
                .orElseGet(() -> ResponseEntity.ok("User successfully joined the group"));
    }

    /**
     * Retrieves all groups.
     *
     * @return a list of all group DTOs
     */
    @GetMapping("/get/allGroups")
    public List<GroupDTO> getAllGroups() {
        return groupService.getAllGroups();
    }

    /**
     * Retrieves a specific group by its ID.
     *
     * @param groupId the ID of the group
     * @return ResponseEntity with the group DTO or an error message
     */
    @GetMapping("/get/group/{groupId}")
    public ResponseEntity<?> getGroup(@PathVariable int groupId) {
        Optional<GroupDTO> groupDTO = groupService.getGroup(groupId);
        if (groupDTO.isPresent()) {
            return ResponseEntity.ok(groupDTO);
        } else {
            return ResponseEntity.badRequest().body("No group for this id was found");
        }
    }

    /**
     * Retrieves all groups for a specific user by their email.
     *
     * @param userEmail the email of the user
     * @return ResponseEntity with a list of group DTOs
     */
    @GetMapping("/get/allGroups/{userEmail}")
    public ResponseEntity<List<GroupDTO>> getAllGroupsByUser(@PathVariable String userEmail) {
        List<GroupDTO> groups = groupService.getAllGroupsByUser(userEmail);
        return ResponseEntity.ok(groups);
    }

    /**
     * Updates the information of a group.
     *
     * @param groupDTO the group DTO with updated information
     * @return ResponseEntity with a success or error message
     */
    @PostMapping("/update/groupInfo")
    public ResponseEntity<String> updateGroupInfo(@RequestBody GroupDTO groupDTO) {
        Optional<String> result = groupService.updateGroupInfo(groupDTO);
        return result.map(ResponseEntity.badRequest()::body)
                .orElseGet(() -> ResponseEntity.ok("Group Info Successfully updated"));
    }

    /**
     * Deletes a group by its ID.
     *
     * @param groupId the ID of the group to be deleted
     * @return ResponseEntity with a success or error message
     */
    @DeleteMapping("/delete/group/{groupId}")
    public ResponseEntity<String> deleteGroup(@PathVariable int groupId) {
        Optional<String> result = groupService.deleteGroup(groupId);
        return result.map(ResponseEntity.badRequest()::body)
                .orElseGet(() -> ResponseEntity.ok("Group Successfully deleted"));
    }

    /**
     * Deletes a group membership by its ID.
     *
     * @param groupMembershipId the ID of the group membership to be deleted
     * @return ResponseEntity with a success or error message
     */
    // I haven't considered whether we can delete group creator
    @DeleteMapping("/delete/groupMembership/{groupMembershipId}")
    public ResponseEntity<String> deleteGroupMembership(@PathVariable int groupMembershipId) {
        Optional<String> result = groupService.deleteGroupMembership(groupMembershipId);
        return result.map(ResponseEntity.badRequest()::body)
                .orElseGet(() -> ResponseEntity.ok("Group membership Successfully deleted"));
    }

    /**
     * Retrieves all members of a specific group by its ID.
     *
     * @param groupId the ID of the group
     * @return a list of group membership DTOs
     */
    @GetMapping("/get/group/{groupId}/members")
    public List<GroupMembershipDTO> getGroupMembersByGroupId(@PathVariable int groupId) {
        return groupService.getGroupMembersByGroupId(groupId);
    }

    /**
     * Retrieves the membership ID for a user in a specific group.
     *
     * @param userEmail the email of the user
     * @param groupId the ID of the group
     * @return ResponseEntity with the membership ID or an error message
     */
    @GetMapping("/get/getMemberShipId/{userEmail}/{groupId}")
    public ResponseEntity<?> getMemberShipId(@PathVariable String userEmail, @PathVariable int groupId) {
        Optional<Integer> membershipId = groupService.getMemberShipId(userEmail, groupId);
        if (membershipId.isPresent()) {
            return ResponseEntity.ok(membershipId.get());
        } else {
            return ResponseEntity.badRequest().body("User is not a member");
        }
    }

}