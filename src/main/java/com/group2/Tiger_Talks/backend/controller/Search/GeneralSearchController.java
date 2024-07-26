package com.group2.Tiger_Talks.backend.controller.Search;

import com.group2.Tiger_Talks.backend.model.Group.GroupDTO;
import com.group2.Tiger_Talks.backend.model.Search.GeneralSearchResult;
import com.group2.Tiger_Talks.backend.model.User.UserProfileDTO;
import com.group2.Tiger_Talks.backend.service.Search.Searchable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/search/general")
public class GeneralSearchController {
    @Autowired
    private Searchable<GroupDTO> groupSearchService;

    @Autowired
    private Searchable<UserProfileDTO> userSearchController;

    /**
     * Run a general search for both user profiles and groups based on the search query and user email.
     *
     * @param searchQuery the search query string
     * @param userEmail   the email of the user performing the search
     * @return a GeneralSearchResult containing the search results for users and groups
     */
    @GetMapping("/{searchQuery}/{userEmail}")
    public GeneralSearchResult generalSearchResult(@PathVariable String searchQuery, @PathVariable String userEmail) {
        return new GeneralSearchResult(
                userSearchController.search(searchQuery, userEmail),
                groupSearchService.search(searchQuery, userEmail)
        );
    }
}
