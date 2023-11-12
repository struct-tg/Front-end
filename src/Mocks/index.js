import React, { useContext } from "react";
import { AutenticacaoContext } from "../Contexts/UserContext";
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

/*ToDo Images*/
import ToDoImage from "../../assets/images/ToDoImages/ToDo-InitialImage.png";
import ToDoFilterImage from "../../assets/images/ToDoImages/Filter-InitialImage.png";
import ToDoChartImage from "../../assets/images/ToDoImages/Chart-InitialImage.png";
import ToDoModalImage from "../../assets/images/ToDoImages/Modal-InitialImage.png";

/*Home Images*/
import HomeImage from "../../assets/images/HomeImages/Home-InitialImage.png";

/* Pomodoro Images */
import PomodoroImage from "../../assets/images/PomodoroImages/Pomodoro.png";

/* Disciplinas Images */
import DisciplinesImage from "../../assets/images/DisciplinesImages/Disciplines-InitialImage.png";
import DisciplineFiltersImage from "../../assets/images/DisciplinesImages/DisciplinesFilters-InitialImage.png"
import DisciplinesFiltersToDoImage from "../../assets/images/DisciplinesImages/DisciplinesFiltersToDo-InitialImage.png";

/* Atividades Images */
import ActivityImage from "../../assets/images/ActivityImages/Activity-InitialImage.png";
import ActivityFilterImage from "../../assets/images/ActivityImages/ActivityFilters-InitialImage.png";

const useMocks = () => {
    const { username } = useContext(AutenticacaoContext);
    const imageWidth = widthPercentageToDP('100%');
    const imageHeight = heightPercentageToDP('50%');

    const HomeMocks = {
        HomeScreen: {
            title: `Você ainda não tem dados suficientes cadastrados, ${username}!`,
            image: {
                content: HomeImage,
                width: imageWidth,
                height: imageHeight,
                rezide: 'cover'
            }
        }
    }

    const ActivityMocks = {
        ActivityScreen: {
            title: `Adicione novas atividades para esta disciplina, ${username}!`,
            image: {
                content: ActivityImage,
                width: imageWidth,
                height: imageHeight,
                rezide: 'cover'
            },
            alerts: {
                deleteActivity: {
                    title: 'Deseja mesmo excluir sua atividade?',
                    description: 'Essa ação é irreversível e não terá como você desfazer após a confirmação',
                },
            }
        },
        ActivityFiltersScreen: {
            title: `Você não tem atividades para filtar, ${username}!`,
            image: {
                content: ActivityFilterImage,
                width: imageWidth,
                height: imageHeight,
                rezide: 'cover'
            },
        }
    }

    const DisciplinesMocks = {
        DisciplineScreen: {
            title: `Adicione novas disciplinas, ${username}!`,
            image: {
                content: DisciplinesImage,
                width: imageWidth,
                height: imageHeight,
                rezide: 'cover'
            },
            speech: `Olá, ${username}! Vou te explicar como funciona as nossas tarefas...`,
            alerts: {
                deleteDiscipline: {
                    title: 'Deseja mesmo excluir sua disciplina?',
                    description: 'Essa ação é irreversível e não terá como você desfazer após a confirmação',
                },
                finishDiscipline: {
                    title: 'Você tem certeza dessa ação?',
                    description: 'Ao confirmar, você encerrará está disciplina e todas as suas atividades avaliativas.',
                }
            }
        },
        DisciplineFiltersScreen: {
            title: `Adicione novas disciplinas para filtrar, ${username}!`,
            image: {
                content: DisciplineFiltersImage,
                width: imageWidth,
                height: imageHeight,
                rezide: 'cover'
            }
        },
        DisciplineFiltersToDo: {
            title: `Adicione novas tarefas relacionadas com disciplinas para filtrar, ${username}!`,
            image: {
                content: DisciplinesFiltersToDoImage,
                width: imageWidth,
                height: imageHeight,
                rezide: 'cover'
            }
        }
    }

    const ToDoMocks = {
        ToDoScreen: {
            title: `Adicione novas tarefas, ${username}!`,
            speech: `Utilizamos o sistema de cores ao redor dos cards para lembrar você dos seus afazeres. Essas são as nossas legendas: Bordas Verdes: Tarefas concluídas. Bordas Azuis-celestes: Tarefas pendentes. Bordas Vermelhas: Tarefas atrasadas.`,
            image: {
                content: ToDoImage,
                width: imageWidth,
                height: imageHeight,
                rezide: 'cover'
            },
            modal: {
                uppercaseTitle: `Atenção aos prazos, ${username}!`,
                title: 'Cards com cores?',
                texto: 'Utilizamos o sistema de cores ao redor dos cards para lembrar você dos seus afazeres. Essas são as nossas legendas:',
                legend: {
                    concluida: 'Bordas Verdes: Tarefas concluídas.',
                    pendente: 'Bordas Azuis-celestes: Tarefas pendentes.',
                    atrasada: 'Bordas Vermelhas: Tarefas atrasadas.'
                },
                image: {
                    content: ToDoModalImage,
                    width: imageWidth,
                    height: imageHeight,
                    rezide: 'cover'
                }
            },
            alerts: {
                deleteTask: {
                    title: `Deseja mesmo excluir sua tarefa?`,
                    description: 'Essa ação é irreversível e não terá como você desfazer após a confirmação.',
                },
                finishTask: {
                    title: `Parabéns, ${username}!`,
                    description: 'Você finalizou mais uma tarefa. Continue estudando, estamos com você na sua jornada.',
                },
                unfinishedTask: {
                    title: 'Você já finalizou esta tarefa!',
                    description: 'A partir de agora, só é possível visualizar o conteúdo adicionado nesta tarefa.'
                }
            }
        },
        ToDoFiltersScreen: {
            title: `Adicione novas tarefas para filtrar, ${username}!`,
            image: {
                content: ToDoFilterImage,
                width: imageWidth,
                height: imageHeight,
                rezide: 'cover'
            }
        },
        ToDoChartScreen: {
            title: `Você ainda não tem tarefas cadastradas para usar este gráfico, ${username}!`,
            titleDatas: `Essas são as porcentagens dos status das suas tarefas dos últimos 6 meses, ${username}!`,
            image: {
                content: ToDoChartImage,
                width: imageWidth,
                height: imageHeight,
                rezide: 'cover'
            }
        }
    }

    const PomodoroMocks = {
        PomodoroScreen: {
            title: `Adicione novos Pomodoros, ${username}!`,
            speech: `Vou te explicar como funciona o nosso sistema de Pomodoro, ${username}. Você pode personalizar os seus próprios ciclos, escolhendo os tempos de Pomodoro, pausas curtas e pausas longas, além disso, é possivel determinar quando será aplicado a sua pausa longa.
                Um ciclo é definido como um tempo de Pomodoro e, após isso, uma pausa curta. Esta abordagem estruturada permite otimizar sua performance durante os estudos, promovendo uma melhor concentração e produtividade.
            `,
            image: {
                content: PomodoroImage,
                width: imageWidth,
                height: imageHeight,
                rezide: 'cover'
            },
            alerts: {
                deleteTask: {
                    title: `Deseja mesmo excluir este Pomodoro?`,
                    description: 'Essa ação é irreversível e não terá como você desfazer após a confirmação.',
                }
            },
        },
        pomodoroClock: {
            alerts: {
                finishAllCycles: {
                    title: `Parabéns, ${username}!!! ✨🎉✨🎉`,
                    description: `Você concluiu todos os cinco ciclos de Pomodoro. Continue focado nos estudos, estamos com você.`,
                },
                decisionLongPausa: {
                    title: `Você tem certeza dessa ação, ${username}?`,
                    description: `Ao concluir esta ação, você perderá o tempo de pomodoro anterior para completar um ciclo.`,
                },
                requiredLongPause: {
                    title: `Agora é o momento da sua pausa longa!`,
                    description: `Pare por um momento e descanse, ${username}. Este é uns dos momentos mais importantes para a sua produtividade.`
                },
            }
        }
    }

    return { HomeMocks, DisciplinesMocks, PomodoroMocks, ToDoMocks, ActivityMocks };
}

export default useMocks;