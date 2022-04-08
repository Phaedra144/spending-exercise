package com.polygence.spending.exercise.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.polygence.spending.exercise.SpendingExerciseApplication;
import com.polygence.spending.exercise.dto.SpendingItem;
import com.polygence.spending.exercise.service.SpendingService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
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
    public void setup() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.webApplicationContext).build();
    }

    @Test
    public void testGetSpendings() throws Exception {
        when(spendingServiceMock.getSpendings())
                .thenReturn(List.of(new SpendingItem(1, "First spending", 342352,
                        LocalDateTime.of(2022, 3, 4, 3, 12), "HUF"),
                        new SpendingItem(2, "Second spending", 123,
                        LocalDateTime.of(2022, 3, 4, 3, 12), "USD")));

        this.mockMvc.perform(get("/spendings"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].description").value("First spending"))
                .andExpect(jsonPath("$[0].amount").value("342352"))
                .andExpect(jsonPath("$[0].currency").value("HUF"))
                .andExpect(jsonPath("$[0].spentAt").value("2022-03-04T03:12:00"))
                .andReturn();
    }

    @Test
    void testGetSpendingById() throws Exception {
        when(spendingServiceMock.getSpendingItemById(1L))
                .thenReturn(new SpendingItem(1, "First spending", 124,
                        LocalDateTime.of(2022, 3, 4, 4, 12), "USD"));

        this.mockMvc.perform(get("/spendings/{id}", 1))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.description").value("First spending"))
                .andExpect(jsonPath("$.amount").value("124"))
                .andExpect(jsonPath("$.currency").value("USD"))
                .andExpect(jsonPath("$.spentAt").value("2022-03-04T04:12:00"))
                .andReturn();
    }

    @Test
    void createSpendingItem() throws Exception {
        SpendingItem spendingItem = new SpendingItem(1, "First spending", 342352,
                null, "HUF");
        doNothing().when(spendingServiceMock).createSpendingItem(spendingItem);

        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
        String requestJson=ow.writeValueAsString(spendingItem);

        this.mockMvc.perform(post("/spendings")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestJson))
                .andDo(print())
                .andExpect(status().isCreated());
    }
}