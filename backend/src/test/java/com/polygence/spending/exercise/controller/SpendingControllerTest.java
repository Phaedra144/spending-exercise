package com.polygence.spending.exercise.controller;

import com.polygence.spending.exercise.SpendingExerciseApplication;
import com.polygence.spending.exercise.dto.SpendingItem;
import com.polygence.spending.exercise.service.SpendingService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment= SpringBootTest.WebEnvironment.MOCK, classes={ SpendingExerciseApplication.class })
class SpendingControllerTest {

    @Autowired
    private WebApplicationContext webApplicationContext;

    @MockBean
    private SpendingService spendingServiceMock;

    private MockMvc mockMvc;
    @BeforeEach
    public void setup() throws Exception {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.webApplicationContext).build();
    }

    @Test
    public void testGetSpendings() throws Exception {

        when(spendingServiceMock.getSpendings())
                .thenReturn(List.of(new SpendingItem("First spending", 342352,
                        LocalDateTime.of(2022, 3, 4, 3, 12), "HUF")));

        this.mockMvc.perform(get("/spendings"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].description").value("First spending"))
                .andReturn();
    }

    @Test
    void getAllSpendings() {
    }

    @Test
    void getSpendingById() {
    }

    @Test
    void createSpendingItem() {
    }
}